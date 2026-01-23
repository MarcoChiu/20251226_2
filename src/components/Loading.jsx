

import { Oval } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-content">
                <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#6acee0"
                    secondaryColor="#ffc1d9"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
                <p className="loading-text">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;