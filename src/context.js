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



    const [currentJobs, setCurrentJobs] = useState(jobsList);
    const [jobsOnPaginate, setJobsOnPaginate] = useState(currentJobs)
    // filter
    const [filterTag, setFilterTag] = useState('all');
    useEffect(() => {
        if (filterTag === 'all') {
            setCurrentJobs(jobsList);
        } else {
            setCurrentJobs(jobsList.filter(job => job.tags.indexOf(filterTag) > -1));
        }
    }, [filterTag, jobsOnPaginate])

    console.log(currentJobs, jobsOnPaginate);

    // Pagination
    const jobsPerPage = 5;
    const pageNumber = Math.ceil(currentJobs.length / jobsPerPage);



    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        const indexOfLastJob = currentPage * jobsPerPage;
        const indexOfFirstJob = indexOfLastJob - jobsPerPage;
        setJobsOnPaginate(jobsList.slice(indexOfFirstJob, indexOfLastJob));
    }, [jobsPerPage, currentPage])

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
        currentJobs,
        paginate,
        pageNumber,
        currentPage,
        setCurrentPage,
        jobsOnPaginate,
        filterTag,
        setFilterTag
    }
    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    )
}