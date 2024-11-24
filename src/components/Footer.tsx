export default function Footer({
  totalMessages,
  activeConnections,
}: {
  totalMessages: number;
  activeConnections: number;
}) {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 p-3">
      <div className="container mx-auto flex justify-between text-sm text-slate-600">
        <span>Total Messages Processed: {totalMessages.toLocaleString()}</span>
        <span>Active Connections: {activeConnections}</span>
      </div>
    </footer>
  );
}