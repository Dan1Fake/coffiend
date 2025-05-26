import { Children } from 'react';
import ReactDom from 'react-dom';
export default function Modal(props) {

    const { children, setShowModal } = props;

    return ReactDom.createPortal(
        <div className='modal-container'>
            <button onClick={() => setShowModal(false)} className='modal-underlay'/>
            <div className='modal-content'>
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    )
}