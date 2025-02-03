
module.exports = {
    generateDBURL: (host, port, name) => {
        return `${host}:${port}/${name}`
    },
    httpResponse: (res, code, payload, type) => {
        if(type === 'message'){
            return res.status(code).json({message: payload});
        }else if(type === 'error'){
            return res.status(code).json({error: payload});
        }
        return res.status(code).json(payload);
    },
    smartTrim: (str, length, delim, appendix) => {
        if(str.length <= length) return str;

        let trimmedStr = str.substr(0, length + delim.length);

        let lastDelimIndex = trimmedStr.lastIndexOf(delim);
        if( lastDelimIndex >=0 ) {
            trimmedStr = trimmedStr.substr(0, lastDelimIndex);
        }
        if(trimmedStr){
            trimmedStr += appendix;
        }

        return trimmedStr;
    }
}