"use client";

import {useEffect, useMemo, useRef, useState} from "react";
import IHelpdeskTicket from "@/interfaces/IHelpdeskTicket";
import INewTicketDraft from "@/interfaces/INewTicketDraft";
import IHelpdeskMessage from "@/interfaces/IHelpdeskMessage";
import HelpdeskShell from "@/components/helpdesk/helpdesk-shell";
import {backend} from "@/lib/backend";
import {toast} from "sonner";
import {useEcho} from "@/context/EchoContext";

type MobileView = "tickets" | "chat";

export default function HelpdeskClient({
                                           initialTickets,
                                       }: {
    initialTickets: IHelpdeskTicket[];
}) {
    const [tickets, setTickets] = useState<IHelpdeskTicket[]>(initialTickets);
    const [selectedTicketId, setSelectedTicketId] = useState<string>(
        initialTickets[0]?.id ?? ""
    );
    const [mobileView, setMobileView] = useState<MobileView>("tickets");

    const [draft, setDraft] = useState<INewTicketDraft | null>(null);

    const selectedTicket = useMemo(
        () => tickets.find((t) => t.id === selectedTicketId) ?? null,
        [tickets, selectedTicketId]
    );

    const {echo, isReady} = useEcho();

    const subscribedRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        if (!isReady || !echo) return;

        const ids = tickets.map(t => t.id).filter(Boolean);

        for (const id of ids) {
            if (subscribedRef.current.has(id)) continue;

            subscribedRef.current.add(id);

            echo
                .private(`Helpdesk.Ticket.${id}`)
                .listen(".helpdesk.message", (payload: { ticket_id: string; message: IHelpdeskMessage }) => {
                    const ticketId = payload.ticket_id ?? id;
                    const msg = payload.message;

                    setTickets(prev => {
                        const next = prev.map(t => {
                            if(t.id !== ticketId) return t;

                            const alreadyThere = t.messages?.some(m => m.id === msg.id);
                            if (alreadyThere) return t;

                            return {
                                ...t,
                                updated_at: msg.created_at ?? new Date().toLocaleString(),
                                messages: [...(t.messages ?? []), msg],
                            };
                        })

                        const idx = next.findIndex(t => t.id === ticketId);
                        if (idx > 0) {
                            const [hit] = next.splice(idx, 1);
                            next.unshift(hit);
                        }

                        return next;
                    })
                });

            return () =>{
                // eslint-disable-next-line react-hooks/exhaustive-deps
                for (const id of subscribedRef.current) {
                    echo.leave(`private-Helpdesk.Ticket.${id}`);
                }
                subscribedRef.current.clear();
            };
        }
    },[tickets, isReady, echo]);

    function handleSelectTicket(id: string) {
        setSelectedTicketId(id);
        setMobileView("chat");
    }

    function handleNewTicket() {
        if (draft) return;

        setDraft({ subject: "", message: "" });
        setSelectedTicketId("");
        setMobileView("chat");
    }

    async function handleSubmitDraft() {
        if (!draft) return;

        const subject = draft.subject.trim();
        const messageText = draft.message.trim();

        if (!subject) return;

        if (!messageText) return;

        const req = await backend("helpdesk","POST",{
            subject,
        })

        if (req.statusCode !== 201) {
            toast.error("Az új hibajegy megnyitása sikertelen.")
            return;
        }

        const newTicket = req.data as IHelpdeskTicket;

        const reqMsg = await backend(`helpdesk/${newTicket.id}/message`,"POST",{
            content: messageText,
        });

        if(reqMsg.statusCode !== 201) {
            toast.error("Hiba történt az üzenet küldése közben.");
        }

        const msg = reqMsg.data as IHelpdeskMessage;

        newTicket.messages.push(msg);

        setTickets((prev) => [newTicket, ...prev]);
        setDraft(null);
        setSelectedTicketId(newTicket.id);
        setMobileView("chat");
    }

    async function handleSendMessage(text: string) {
        if (!selectedTicket) return;

        const req = await backend(`helpdesk/${selectedTicket.id}/message`,"POST",{
            content: text,
        });

        if(req.statusCode !== 201) {
            toast.error("Hiba történt az üzenet küldése közben.");
            return;
        }

        const msg = req.data as IHelpdeskMessage;

        setTickets((prev) =>
            prev.map((t) =>
                t.id !== selectedTicket.id
                    ? t
                    : { ...t, updated_at: new Date().toLocaleString(), messages: [...t.messages, msg] }
            )
        );
    }

    return (
        <HelpdeskShell
            tickets={tickets}
            selectedTicket={selectedTicket}
            selectedTicketId={selectedTicketId}
            mobileView={mobileView}
            onMobileViewChange={setMobileView}
            onSelectTicket={handleSelectTicket}
            onNewTicket={handleNewTicket}
            onSendMessage={handleSendMessage}
            draft={draft}
            onDraftChange={setDraft}
            onSubmitDraft={handleSubmitDraft}
        />
    );
}
