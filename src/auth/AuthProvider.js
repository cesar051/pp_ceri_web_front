import { useContext, createContext, useState, useEffect } from "react";
import { queryWithBody } from "../helpers/queryCall";

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => { },
    getRefreshToken: () => { },
    saveUser: (userData) => { },
    signOut: () => { },
    getUser: () => { }
})

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [accessToken, setAccessToken] = useState("")
    const [user, setUser] = useState({})

    useEffect(() => {
        console.log("llega");

        checkAuth();
    }, [])

    function getUser() {
        return user
    }

    function DeleteTokenFromBD() {

        const url = `${process.env.REACT_APP_API_URL}/signOut`;
        const requestData = {};
        const refreshToken = getRefreshToken();
        const callBackGetUserBasicInfo = (data) => {
            if (data.statusCode === 200) {
                console.log("borrado " + refreshToken);
            }
        }
        const errorCallBackFunctionGetUserBasicInfo = () => { }
        const authParams = {
            requiereAuthentication: true,
            token: refreshToken
        }

        queryWithBody(url, requestData, callBackGetUserBasicInfo, errorCallBackFunctionGetUserBasicInfo, authParams, 'DELETE');

    }

    function signOut() {
        setIsAuthenticated(false)
        setAccessToken("")
        setUser(undefined)
        DeleteTokenFromBD()
        localStorage.removeItem("token")

    }

    function requestUserBasicInfo(accessToken, refreshToken) {

        const url = `${process.env.REACT_APP_API_URL}/getBasicUserInfo`;
        const requestData = {};
        const callBackGetUserBasicInfo = (data) => {
            if (data.statusCode === 200) {
                console.log("basic info");
                console.log(data)
                console.log(accessToken, refreshToken);

                saveSessionInfo(data.data[0][0], accessToken, refreshToken)
                console.log("logueado");
            }
        }
        const errorCallBackFunctionGetUserBasicInfo = () => { }
        const authParams = {
            requiereAuthentication: true,
            token: accessToken
        }

        queryWithBody(url, requestData, callBackGetUserBasicInfo, errorCallBackFunctionGetUserBasicInfo, authParams, 'POST');
    }

    function requestNewAccessToken(refreshToken) {

        const url = `${process.env.REACT_APP_API_URL}/refreshToken`;
        const requestData = {};
        const callBackREquestNewAccessToken = (data) => {
            if (data.statusCode === 200) {
                const newAccessToken = data.accessToken
                console.log("new access token " + newAccessToken);

                requestUserBasicInfo(newAccessToken, refreshToken)
            }
        }
        const errorCallBackFunctionGetUserBasicInfo = () => {
            signOut()
        }
        const authParams = {
            requiereAuthentication: true,
            token: refreshToken
        }

        queryWithBody(url, requestData, callBackREquestNewAccessToken, errorCallBackFunctionGetUserBasicInfo, authParams, 'POST');

    }

    function saveSessionInfo(userInfo, accessToken, refreshToken) {
        setAccessToken(accessToken)
        localStorage.setItem("token", JSON.stringify(refreshToken))
        setIsAuthenticated(true);
        setUser(userInfo)
    }

    function checkAuth() {
        if (accessToken) {
            console.log("si hay");

            requestUserBasicInfo(accessToken, getRefreshToken())
        } else {
            console.log("no hay");
            const token = getRefreshToken();
            console.log(token)
            if (token) {
                requestNewAccessToken(token)
            } else {

            }
        }
    }

    function getAccessToken() {
        return accessToken
    }

    function getRefreshToken() {
        const token = localStorage.getItem("token")

        if (token) {
            const refreshToken = JSON.parse(token)
            return refreshToken;
        }
        return null
    }

    function saveUser(userData) {
        //requestUserBasicInfo(userData.accessToken, userData.refreshToken)
        saveSessionInfo({
            id: userData.userId,
            nit: userData.nit,
            nombres: userData.nombres,
            correo: userData.correo,
            celular: userData.celular,
            perfil: userData.perfil
        }, userData.accessToken, userData.refreshToken);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, getAccessToken, getRefreshToken, saveUser, signOut, getUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);