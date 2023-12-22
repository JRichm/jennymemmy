"use client"

import React, { useEffect, useState } from 'react';
import './timeline.css';

interface MemoryType {
    id: number;
    name: string;
    description: string;
    date: Date;
    created: Date;
    updated: Date | null;
}

export default function Timeline() {

    const [fetchedMemories, setMemories] = useState<MemoryType[]>([]);

    useEffect(() => {
        const fetchMemories = async () => {
            try {
                const response = await fetch('/api/memories', {
                    method: 'GET',
                });
                const data = await response.json();
                setMemories(data);
            } catch (err) { console.error("Error fetching memories:" ,err) }
        }

        fetchMemories();
    }, []);

    const time = new Date();
    const startDate = new Date('2019-01-01');
    const endDate = time;

    // calculate how many days are between start and end date
    const totalDays = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000);

    
    // calculate how many days are between start date and event
    const TimelineMemory = ({ memory }: { memory: MemoryType }) => {
        const eventDays = (new Date(memory.date).getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000);
        const posPercent = (eventDays / totalDays) * 100;

        return (
            <div key={memory.name} className={'timelineItem'} style={{ left: `${posPercent}%`,zIndex: 2 }}>
              <div className={'itemContent'}>
                <p>{memory.name}</p>
              </div>
            </div>
        )
    }

    return (
        <div>
            <hr />
                <div className='timeline'>
                    {Object.values(fetchedMemories).map((memory) => (
                        <TimelineMemory key={memory.name} memory={memory} />
                    ))}
                </div>
        </div>
    )
};