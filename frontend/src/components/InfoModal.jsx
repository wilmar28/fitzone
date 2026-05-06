import { Modal } from 'react-bootstrap'

function InfoModal({
  isOpen,
  title,
  description,
  details,
  confirmLabel,
  onConfirm,
  onClose,
}) {
  return (
    <Modal show={isOpen} onHide={onClose} centered contentClassName="custom-modal-content" backdropClassName="modal-backdrop">
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title className="custom-modal-title">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <p>{description}</p>
        {details && details.length > 0 && (
          <ul style={{ paddingLeft: '1.2rem', marginTop: '0.8rem' }}>
            {details.map((item, index) => (
              <li key={index} style={{ marginBottom: '0.4rem' }}>{item}</li>
            ))}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer className="custom-modal-footer">
        <button type="button" className="pill-btn" onClick={onClose} style={{ background: 'transparent', border: '1px solid rgba(148, 163, 184, 0.4)' }}>
          Cerrar
        </button>
        {confirmLabel && (
          <button type="button" className="gradient-btn" onClick={onConfirm}>
            {confirmLabel}
          </button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default InfoModal