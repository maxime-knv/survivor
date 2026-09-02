export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="empty-state">
      {Icon ? (
        <div className="empty-state-icon">
          <Icon size={22} strokeWidth={1.8} />
        </div>
      ) : null}
      <p className="empty-state-title">{title}</p>
      {description ? <p className="empty-state-description">{description}</p> : null}
    </div>
  )
}
