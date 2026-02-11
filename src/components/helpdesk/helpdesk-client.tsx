"use client";

import { useMemo, useState } from "react";
import IHelpdeskTicket from "@/interfaces/IHelpdeskTicket";
import INewTicketDraft from "@/interfaces/INewTicketDraft";
import IHelpdeskMessage from "@/interfaces/IHelpdeskMessage";
import HelpdeskShell from "@/components/helpdesk/helpdesk-shell";

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

    function handleSubmitDraft() {
        if (!draft) return;

        const subject = draft.subject.trim();
        const messageText = draft.message.trim();

        if (!subject) return;

        if (!messageText) return;

        const now = new Date().toISOString();
        const id = `t_${Math.random().toString(16).slice(2)}`;

        const firstMsg: IHelpdeskMessage = {
            id: `m_${Math.random().toString(16).slice(2)}`,
            ticketId: id,
            sender: "user",
            content: messageText,
            createdAtIso: now,
        };

        const newTicket: IHelpdeskTicket = {
            id,
            subject,
            status: "open",
            updatedAtIso: now,
            messages: [firstMsg],
        };

        setTickets((prev) => [newTicket, ...prev]);
        setDraft(null);
        setSelectedTicketId(id);
        setMobileView("chat");
    }

    function handleSendMessage(text: string) {
        if (!selectedTicket) return;

        const now = new Date().toISOString();
        const msg: IHelpdeskMessage = {
            id: `m_${Math.random().toString(16).slice(2)}`,
            ticketId: selectedTicket.id,
            sender: "user",
            content: text,
            createdAtIso: now,
        };

        setTickets((prev) =>
            prev.map((t) =>
                t.id !== selectedTicket.id
                    ? t
                    : { ...t, updatedAtIso: now, messages: [...t.messages, msg] }
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
