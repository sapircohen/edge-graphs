import { useState, useEffect } from "react";
import * as mesurmentConsts from '../utils/constants/mesurments';
import {getAverage} from '../utils/generalService';
import data from '../utils/constants/data';
import Chart from "./chart";
import Score from "./common/score";
import Headline from "./common/headline";
import Loader from "./common/loader";
//css
import '../assets/styles/dashboard.css';


const Dashboard = () => {
    const [rawData,setRawData] = useState([]);
    const [speedSkill,setSpeedSkill] = useState({data:[],score:0});
    const [accuracySkill,setAccuracySkill] = useState({data:[],score:0});

    const getData = () =>{
        setRawData([...data]);
    }

    useEffect(()=>{
        getData();
    },[data])

    useEffect(()=>{
        if (rawData?.length>0) {
            initDataCalaculation();
        }
    },[rawData])

    const initDataCalaculation = () => {
        let speedTempSkill = {data:[],score:0};
        let accuracyTempSkill = {data:[],score:0};
        let avgObj = {};
    
        //adding grade
        rawData.forEach((mesurment) => {
            mesurment.grade = getGrade(mesurment.type, mesurment.value);
            mesurmentConsts.isSpeedType(mesurment.type)?speedTempSkill.data.push(mesurment):accuracyTempSkill.data.push(mesurment);

            let type = mesurment.type.toLowerCase();
            if (!(mesurment.type in avgObj)) {
                avgObj[type] = [];
            }
            avgObj[type].push(mesurment.value);
        });

        //calculating scores
        const scores = getScores(avgObj);
        speedTempSkill.score = scores.speedScore;
        accuracyTempSkill.score = scores.accuracyScore;

        setSpeedSkill({...speedTempSkill});
        setAccuracySkill({...accuracyTempSkill});
    }

    const getScores = (avgs) =>{
        const weights = mesurmentConsts.weights;
        return {
            speedScore: getAverage(avgs.move) * weights.move + getAverage(avgs.bomb) * weights.bomb,
            accuracyScore: getAverage(avgs.misses) * weights.misses + getAverage(avgs.headshot) * weights.headshot + getAverage(avgs.body) * weights.body
        }
    }

    const getGrade = (type, value) => {
        return mesurmentConsts.grade[type.toLowerCase()](value);
    };
    
    return (
        <div className="container">
            {
                speedSkill?.data?.length>0 && accuracySkill?.data?.length>0 
                ?  
                <div className="graphs">
                    <div className="graph">
                        <Headline text="Speed results" />
                        <Score title="Speed score" score={speedSkill.score}/>
                        <Chart data={speedSkill.data} width={800} height={400}/>
                    </div>
                    <div className="graph">
                        <Headline text="Accuracy results"/>
                        <Score title="Accuracy score" score={accuracySkill.score}/>
                        <Chart data={accuracySkill.data} width={800} height={400}/>
                    </div>
                </div> 
                :  
                <Loader/>
            }
        </div>
    )
}

export default Dashboard;