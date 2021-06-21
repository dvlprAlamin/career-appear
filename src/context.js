import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { jobsList } from "./fakeData";
import { auth, googleProvider } from "./firebase";
const UserContext = createContext();

export const useMyContext = () => {
    return useContext(UserContext);
}

export const ContextProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [selectedService, setSelectedService] = useState({});
    const [paymentSuccess, setPaymentSuccess] = useState('')
    const [paymentToggler, setPaymentToggler] = useState(false)
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const email = loggedInUser?.email
    // useEffect(() => {
    //     axios.post('https://arcane-sands-09318.herokuapp.com/admin', { email: email })
    //         .then(res => {
    //             setIsAdmin(res.data)
    //         })
    // }, [email])

    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }
    const logOut = () => {
        return auth.signOut();
    }

    const googleSignIn = () => {
        return auth.signInWithPopup(googleProvider)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setLoggedInUser(user)
            setLoading(false)
        })
        return unsubscribe;
    }, []);



    const [usersOnPaginate, setUserOnPaginate] = useState(jobsList)
    const [currentUsers, setCurrentUsers] = useState(usersOnPaginate);
    // filter
    // const [filterTag, setFilterTag] = useState('');
    // useEffect(() => {
    //         setCurrentUsers(usersOnPaginate.filter(user =>
    //             user.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
    //             user.email.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
    //             user.website.toLowerCase().indexOf(query.toLowerCase()) > -1));
    // }, [filterTag, usersOnPaginate])



    // Pagination
    const usersPerPage = 3;
    const pageNumber = Math.ceil(jobsList.length / usersPerPage);



    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        setUserOnPaginate(jobsList.slice(indexOfFirstUser, indexOfLastUser));
    }, [usersPerPage, currentPage])

    const paginate = (number) => setCurrentPage(number)

    const value = {
        loggedInUser,
        setLoggedInUser,
        signUp,
        login,
        googleSignIn,
        logOut,
        isAdmin,
        selectedService,
        setSelectedService,
        paymentSuccess,
        setPaymentSuccess,
        paymentToggler,
        setPaymentToggler,
        currentUsers,
        paginate,
        pageNumber,
        currentPage,
        setCurrentPage,
        usersOnPaginate
    }
    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    )
}