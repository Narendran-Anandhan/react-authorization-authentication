import axios from "axios";

const apiUrl = "http://localhost:4000";

let headers = {
    'headers': {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "X-Requested-With":"XMLHttpRequest"
    }
};
let user =  JSON.parse(localStorage.getItem('user'));

let accessToken =
    user.token !== "" &&
    user.token !== null &&
    user.token !== undefined
    ? user.token
    : "";

if (accessToken !== '') {
    headers = {
        'headers': {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + accessToken,
            "X-Requested-With":"XMLHttpRequest"

        }
    };
}


const Environment = {
    
    postMethod(action, object) {       
       
        const url = apiUrl + action;
        
        let formData = new FormData();

        // append your data
        for (var key in object) {

            Array.isArray(object[key])
            ?
            object[key].forEach(function (value, i) {
                formData.append(key + '['+i+']', value);
            }) : formData.append(key, object[key]) ;
                      
        }
      
        return axios.post(url, formData, headers);
    },

    getMethod(action, object) {
        
        const url = apiUrl + action;

        let formData = new FormData();

        // append your data
        for (var key in object) {
            formData.append(key, object[key]);
        }
        console.log(headers);
        return axios.get(url, headers, formData);
    }
};

export default Environment;