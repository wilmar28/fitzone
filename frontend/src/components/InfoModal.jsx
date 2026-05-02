function InfoModal({
  isOpen,
  title,
  description,
  details,
  confirmLabel,
  onConfirm,
  onClose,
}) {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2>{title}</h2>
        <p>{description}</p>

        <ul>
          {details?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <button onClick={onConfirm}>
          {confirmLabel}
        </button>

        <button onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default InfoModal