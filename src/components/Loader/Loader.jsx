import { ThreeDots } from "react-loader-spinner";
import css from './Loader.module.css'

const Loader = () => {
    return (
      <div className={css.loaderWrap}>
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#0d3a58"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          
        />
      </div>
    );
}

export default Loader