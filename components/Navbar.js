import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';

const Navbar = () => {
    return (  
        <AppBar>
            <Container>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <Link href="/">
                        <a>
                            <h3>Grapql-Demo</h3>
                        </a>
                    </Link>
                    <Link href="/cart">
                        <a>
                            <h3>Cart</h3>
                        </a>
                    </Link>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
 
export default Navbar;