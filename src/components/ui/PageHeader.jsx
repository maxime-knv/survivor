import { Bell } from 'lucide-react'

export default function PageHeader({ title, children }) {
    return (
        <header className="page-header">
            <h1>{title}</h1>
            <div className="header-actions">
                {children}
                <button className="bell-btn" aria-label="Notifications" type="button">
                    <Bell size={17} strokeWidth={2.2} />
                </button>
            </div>
        </header>
    )
}
