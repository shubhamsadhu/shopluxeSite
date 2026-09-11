import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Info, AlertTriangle, ExternalLink, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div id="toast-container" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let bgClass = 'bg-white border-zinc-200 text-zinc-900';
        let iconColor = 'text-emerald-600';

        if (toast.type === 'affiliate') {
          Icon = ExternalLink;
          bgClass = 'bg-zinc-900 text-white border-zinc-800 shadow-xl';
          iconColor = 'text-amber-400';
        } else if (toast.type === 'info') {
          Icon = Info;
          iconColor = 'text-blue-600';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          iconColor = 'text-amber-600';
        }

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${bgClass}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold leading-tight">{toast.title}</h4>
              {toast.message && (
                <p className={`text-xs mt-1 line-clamp-2 ${toast.type === 'affiliate' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {toast.message}
                </p>
              )}
            </div>
            <button
              id={`toast-close-${toast.id}`}
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-zinc-600 p-0.5 transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
