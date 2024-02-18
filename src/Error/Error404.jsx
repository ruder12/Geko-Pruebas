import { unstable_HistoryRouter } from "react-router-dom";

function Error404() {
    const history = unstable_HistoryRouter();

    const handleGoBack = () => {
      history.goBack();
    };
    return ( <>

    <p>Error404</p>
    
    </> );
}

export default Error404;