import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
const UserContext = createContext();

export const useMyContext = () => {
    return useContext(UserContext);
}

export const ContextProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [paymentSuccess, setPaymentSuccess] = useState('')
    const [paymentSignupToggler, setPaymentSignupToggler] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState('jobSeeker');


    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }
    const logOut = () => {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setLoggedInUser(user)
            setLoading(false)
        })
        return unsubscribe;
    }, []);


    const email = loggedInUser?.email
    useEffect(() => {
        if (email) {
            axios.post('https://pacific-garden-69982.herokuapp.com/UserRole', { email: email })
                .then(res => {
                    setUserRole(res?.data[0]?.role)
                })
        }
    }, [email])

    const [jobs, setJobs] = useState([])
    useEffect(() => {
        axios.get('https://pacific-garden-69982.herokuapp.com/approvedJobs')
            .then(res => {
                setJobs(res.data)
            })
    }, [])





    const [currentJobs, setCurrentJobs] = useState(jobs);
    const [jobsOnPaginate, setJobsOnPaginate] = useState(currentJobs)
    // filter
    const [filterTag, setFilterTag] = useState('all');
    useEffect(() => {
        if (filterTag === 'all') {
            setCurrentJobs(jobs);
        } else {
            setCurrentJobs(jobs.filter(job => job.tags.indexOf(filterTag) > -1));
        }
    }, [filterTag, jobsOnPaginate])


    // Pagination
    const jobsPerPage = 20;
    const pageNumber = Math.ceil(currentJobs.length / jobsPerPage);



    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        const indexOfLastJob = currentPage * jobsPerPage;
        const indexOfFirstJob = indexOfLastJob - jobsPerPage;
        setJobsOnPaginate(jobs.slice(indexOfFirstJob, indexOfLastJob));
    }, [jobsPerPage, currentPage, jobs])

    const paginate = (number) => setCurrentPage(number)
    console.log(jobs, currentJobs)
    const value = {
        loggedInUser,
        setLoggedInUser,
        signUp,
        login,
        logOut,
        userRole,
        paymentSignupToggler,
        setPaymentSignupToggler,
        paymentSuccess,
        setPaymentSuccess,
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