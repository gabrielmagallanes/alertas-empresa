import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';

export default function Configuracion() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <Navbar titulo="Configuración" />
                <div style={{ padding: '24px' }}>
                    <p>Próximamente más opciones de configuración.</p>
                </div>
            </div>
        </div>
    );
}