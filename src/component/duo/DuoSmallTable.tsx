import {NextPage} from "next";
import styled from "@emotion/styled";
import {DuoMainInfoProps} from "@/types/api";
import DuoSmallIndex from "@/component/duo/DuoSmallIndex";


const DuoSmallTable: NextPage<{data: [DuoMainInfoProps]}> = (props) => {

    return (
        <DuoSmallTableWrapper>
            {
                props.data.map((combi, idx) => {
                    return (
                        <DuoSmallIndex data={combi} idx={idx} key={idx}/>
                    )
                })
            }
        </DuoSmallTableWrapper>
    );

}

export default DuoSmallTable;

const DuoSmallTableWrapper = styled.div`
  position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 4px;
`
