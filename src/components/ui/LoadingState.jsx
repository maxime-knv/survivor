export default function LoadingState({ label = 'Chargement...' }) {
    return (
        <div className="loading-state" role="status" aria-live="polite">
            <span className="loading-spinner" aria-hidden="true" />
            {label}
        </div>
    )
}
