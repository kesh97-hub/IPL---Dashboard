import React, { useEffect, useState } from 'react';
import {useParams, Link} from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

import './TeamPage.css';
//  eslint-disable-next-line
export const TeamPage = () => {

    const [team, setTeam] = useState({matches: []}); //can store state variables
    const { teamName } = useParams();

    //useEffect executes the block when something changes.
    //Here this block is executed when the page is empty.
    useEffect(
        () => {
            const fetchTeams = async () => {
                const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}`);
                const data = await response.json();
                console.log(data);
                setTeam(data);
            };
            fetchTeams();
        }, [teamName]
    );

    if(!team || !team.teamName){
        return <h1>Team not found</h1>
    }

    return (
        <div className="TeamPage">
            <div className="team-name-section">
                <h1 className="team-name">{team.teamName}</h1>
            </div>
            
            <div className="win-loss-section">
                Wins / Losses
                <PieChart 
                    animate
                    animationDuration={400}
                    animationEasing="ease-out"
                    labelPosition={50}
                    labelStyle={{
                        fontSize: "10px",
                        fontColor: "FFFFFA",
                        fontWeight: "800",
                    }}
                    label={(data) => data.dataEntry.title}
                    data={[
                        {title: 'Loses', value: team.totalMatches - team.totalWins, color: '#a34d5d'},
                        {title: 'Wins', value: team.totalWins, color: '#4da375'}
                    ]}
                />
            </div>

            <div className="match-detail-section">
                <h3>Latest Matches</h3>
                <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
            </div>
            
            {/*Map each match in the list to MatchSmallCard */}
            {team.matches.slice(1).map(match => <MatchSmallCard key={match.id} teamName={team.teamName} match={match} />)}

            <div className="more-link">
                <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More ></Link>
            </div>
        </div>
    );
}
