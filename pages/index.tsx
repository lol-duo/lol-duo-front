import {NextPage} from "next";
import {HomeCssWrapper} from "@/component/home/HomeCssWrapper";
import DuoMain from "@/component/duo/DuoMain";

const Home: NextPage = () => {

    return (
        <HomeCssWrapper>
            <DuoMain/>
        </HomeCssWrapper>
    );
}
export default Home;