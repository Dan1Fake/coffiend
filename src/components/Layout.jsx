import { useState } from "react";
import Authentication from "./Authentication";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";

export default function Layout(props) {
    const { children } = props;

    const [showModal, setShowModal] = useState(false);

    const { globalUser, logout } = useAuth()

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">CAFFIEND</h1>
                <p>For Insatiable Coffee Lovers</p>
            </div>
            {globalUser ? (
                <button onClick={logout}>
                    <p>Logout</p>
                </button>
                ) : (
                <button onClick={() => { setShowModal(true);}}>
                    <p>Sign up free</p>
                <i className="fa-solid fa-mug-hot"></i>
                </button>)}
        </header>
    );

    const footer = (
        <footer>
            <p>
                <span className="text-gradient">Caffiend</span> was made by Dani (
                <a href="https://www.smoljames.com" target="_blank" rel="noopener noreferrer">
                    Fake
                </a>
                ) <br />
                using the
                <a href="https://www.fantacss.smoljames.com" target="_blank" rel="noopener noreferrer">
                    {" "}
                    FantaCSS
                </a>{" "}
                design library.
            </p>
        </footer>
    );

    return (
        <>
            {showModal && (
                <Modal setShowModal={setShowModal}>
                    <Authentication setShowModal={setShowModal} />
                </Modal>
            )}
            {header}
            <main>{children}</main>
            {footer}
        </>
    );
}
