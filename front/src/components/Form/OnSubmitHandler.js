import config from "../../config";
import axios from 'axios'

const onSubmitHandler = async (data) => {
    const currentDate = new Date();
    const newDate = new Date(data.loanPeriod);

    data.loanPeriod = newDate.getMonth() - currentDate.getMonth() +
        (12 * (newDate.getFullYear() - currentDate.getFullYear()));
    data.personalNumber = parseInt(data.personalNumber)
    data.loanAmount = parseInt(data.loanAmount)
    
    return await axios.get(config.REACT_APP_BACK_END_URL, { params: { ...data } })
        
}

export default onSubmitHandler
