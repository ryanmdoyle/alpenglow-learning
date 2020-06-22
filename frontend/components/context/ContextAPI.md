# Context API
This is the API for the site-wide context.

## Modal Context
The modal context is used to trigger opening/closing of the modal.  It also determines what is rendered withing the modal.

`const modal = useModal(ModalContext);`

`modal.isOpen`: Boolean
Returns whether the modal is open on the page.

`modal.setChildComponent`: React Node
Accepts a child component to render within the modal.

`modal.open()`: Function
Toggles the modal open.

`modal.close()`: Function
Toggles the modal closed.
