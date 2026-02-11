import INewTicketDraft from "@/interfaces/INewTicketDraft";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import IHelpdeskTicket from "@/interfaces/IHelpdeskTicket";
import ChatPanel from "@/components/helpdesk/chat-panel";
import {Separator} from "@/components/ui/separator";
import TicketList from "@/components/helpdesk/ticket-list";
import {cn} from "@/lib/utils";

type MobileView = "tickets" | "chat";

export default function HelpdeskShell({
                                          tickets,
                                          selectedTicket,
                                          selectedTicketId,
                                          mobileView,
                                          onMobileViewChange,
                                          onSelectTicket,
                                          onNewTicket,
                                          onSendMessage,
                                          draft,
                                          onDraftChange,
                                          onSubmitDraft,
                                      }: {
    tickets: IHelpdeskTicket[];
    selectedTicket: IHelpdeskTicket | null;
    selectedTicketId: string;
    mobileView: MobileView;
    onMobileViewChange: (v: MobileView) => void;
    onSelectTicket: (id: string) => void;
    onNewTicket: () => void;
    onSendMessage: (text: string) => void;
    draft: INewTicketDraft | null;
    onDraftChange: (d: INewTicketDraft | null) => void;
    onSubmitDraft: () => void;
}) {
    const isDraftOpen = !!draft;

    return (
        <Card className="border-white/10 bg-white/[0.04] backdrop-blur-xl py-0">
            <div className="flex h-[calc(100vh-180px)] min-h-[520px] w-full flex-col overflow-hidden rounded-xl">
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold text-white/90">Bejelentések</div>
                        <div className="hidden text-xs text-white/50 md:block">
                            ({tickets.length} db)
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 rounded-full bg-white/5 p-1 md:hidden">
                            <Button
                                type="button"
                                variant={mobileView === "tickets" ? "secondary" : "ghost"}
                                size="sm"
                                className="rounded-full"
                                onClick={() => onMobileViewChange("tickets")}
                            >
                                Lista
                            </Button>
                            <Button
                                type="button"
                                variant={mobileView === "chat" ? "secondary" : "ghost"}
                                size="sm"
                                className="rounded-full"
                                onClick={() => onMobileViewChange("chat")}
                                disabled={!selectedTicket}
                            >
                                Chat
                            </Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                size="sm"
                                className="rounded-full cursor-pointer"
                                onClick={onNewTicket}
                                disabled={isDraftOpen}
                            >
                                Új bejelentés
                            </Button>

                            {isDraftOpen && (
                                <div className="hidden text-xs text-white/50 md:block">
                                    Előbb küldd be az aktuális újat.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="flex flex-1 overflow-hidden">
                    <div
                        className={[
                            "w-full md:w-[340px] md:flex-none",
                            "overflow-hidden",
                            mobileView === "tickets" ? "flex" : "hidden md:flex",
                        ].join(" ")}
                    >
                        <TicketList
                            tickets={tickets}
                            selectedTicketId={selectedTicketId}
                            onSelectTicket={onSelectTicket}
                        />
                    </div>

                    <Separator className="hidden bg-white/10 md:block" orientation="vertical" />

                    <div className={cn("flex-1 overflow-hidden",mobileView === "chat" ? "flex" : "hidden md:flex")}>
                        <ChatPanel
                            ticket={selectedTicket}
                            onSendMessage={onSendMessage}
                            draft={draft}
                            onDraftChange={onDraftChange}
                            onSubmitDraft={onSubmitDraft}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
}
