import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function InfoModal({
  title, message, headerClassName
}) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleIsOpen = () => setIsOpen(!isOpen);

  const CloseButton = (
    <Button
      outline
      color="danger"
      onClick={toggleIsOpen}
      className="border-0 bg-transparent"
    >
      <FontAwesomeIcon
        fixedWidth
        size="lg"
        icon={faTimes}
      />
    </Button>
  );

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleIsOpen}
      contentClassName="bg-dark text-extra-light"
    >
      <ModalHeader
        toggle={toggleIsOpen}
        close={CloseButton}
        className={`py-1 bg-darker border-warning shadow ${headerClassName || ''}`}
      >
        {title}
      </ModalHeader>
      <ModalBody>
        {message}
      </ModalBody>
      <ModalFooter className="pb-0 pt-1 border-warning">
        <Button
          outline
          size="sm"
          color="primary"
          onClick={toggleIsOpen}
          className="px-5"
        >
          OK
        </Button>
      </ModalFooter>
    </Modal>
  );
}
