import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import IHelpdeskTicket from "@/interfaces/IHelpdeskTicket";
import INewTicketDraft from "@/interfaces/INewTicketDraft";
import MessageList from "@/components/helpdesk/message-list";

export default function ChatPanel({
                                      ticket,
                                      onSendMessage,
                                      draft,
                                      onDraftChange,
                                      onSubmitDraft,
                                  }: {
    ticket: IHelpdeskTicket | null;
    onSendMessage: (text: string) => void;

    draft: INewTicketDraft | null;
    onDraftChange: (d: INewTicketDraft | null) => void;
    onSubmitDraft: () => void;
}) {
    const [touched, setTouched] = useState(false);

    if (draft) {
        const subjectOk = draft.subject.trim().length > 0;
        const messageOk = draft.message.trim().length > 0;

        return (
            <div className="flex h-full w-full flex-col overflow-hidden">
                <div className="px-4 py-3">
                    <div className="text-sm font-semibold text-white/90">Új bejelentés</div>
                    <div className="mt-1 text-xs text-white/50">
                        Minden bejelentés először egy automatizált támogató rendszerhez kerül, de bármikor kérheti munkatársunk segítségét.
                    </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="flex-1 overflow-hidden p-4">
                    <Card className="border-white/10 bg-white/3 p-4">
                        <div className="space-y-3">
                            <div>
                                <div className="mb-1 text-xs text-white/60">Tárgy</div>
                                <Input
                                    value={draft.subject}
                                    onChange={(e) =>
                                        onDraftChange({ ...draft, subject: e.target.value })
                                    }
                                    onBlur={() => setTouched(true)}
                                    placeholder="Pl.: Nem tudok belépni / 500-as hiba mentésnél"
                                    className="bg-white/3 text-white/90 placeholder:text-white/40"
                                />
                                {touched && !subjectOk && (
                                    <div className="mt-1 text-xs text-red-300">
                                        A tárgy megadása kötelező.
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="mb-1 text-xs text-white/60">Üzenet</div>
                                <Textarea
                                    value={draft.message}
                                    onChange={(e) =>
                                        onDraftChange({ ...draft, message: e.target.value })
                                    }
                                    onBlur={() => setTouched(true)}
                                    placeholder="Írd le röviden a problémát…"
                                    className="min-h-35 bg-white/3 text-white/90 placeholder:text-white/40"
                                />
                                {touched && !messageOk && (
                                    <div className="mt-1 text-xs text-red-300">
                                        Az első üzenet megadása kötelező.
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => onDraftChange(null)}
                                >
                                    Mégse
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setTouched(true);
                                        if (!subjectOk || !messageOk) return;
                                        onSubmitDraft();
                                    }}
                                    disabled={!subjectOk || !messageOk}
                                >
                                    Beküldés
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="flex h-full w-full items-center justify-center p-6">
                <Card className="w-full max-w-md border-white/10 bg-white/3 p-6 text-center">
                    <div className="text-sm font-semibold text-white/85">
                        Nincs kiválasztott bejelentés
                    </div>
                    <div className="mt-2 text-xs text-white/55">
                        Válassz egyet a listából, vagy nyiss újat.
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex h-full w-full flex-col overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-white/90">
                        {ticket.subject}
                    </div>
                    <div className="mt-1 text-xs text-white/50">Ticket ID: {ticket.id}</div>
                </div>
            </div>

            <Separator className="bg-white/10" />

            <div className="flex-1 overflow-hidden">
                <MessageList messages={ticket.messages} />
            </div>

            <Separator className="bg-white/10" />

            <div className="p-3">
                <form
                    className="flex items-center gap-2"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.currentTarget);
                        const text = String(fd.get("message") ?? "").trim();
                        if (!text) return;
                        onSendMessage(text);
                        e.currentTarget.reset();
                    }}
                >
                    <Input
                        name="message"
                        placeholder="Írj egy üzenetet…"
                        className="bg-white/3 text-white/90 placeholder:text-white/40"
                        autoComplete="off"
                    />
                    <Button type="submit" className="shrink-0">
                        Küldés
                    </Button>
                </form>
            </div>
        </div>
    );
}
