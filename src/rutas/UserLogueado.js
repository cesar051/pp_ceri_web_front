import Home from "../pages/Home/Home";
import { Route, Routes, useLocation } from 'react-router-dom';

const UserLogueado = () => {
    //const dispatch = useAppDispatch();
    //const location = useLocation(); // Obtener la ubicación actual
    //console.log(location.pathname);

    //const [isLogged, setIsLogged] = useState<boolean>(false);
    /*useEffect(() => {
        const isLogged = validationToken(dispatch);
        setIsLogged(isLogged)
    }, []);*/
    return (
        <>
            <Routes>
                <Route path='/home' element={<Home />} />
            </Routes>
        </>
    )
}

export default UserLogueado;