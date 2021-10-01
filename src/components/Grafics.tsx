import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface IData {
    name: string,
    precipitation: number,
    temperature: number
}

interface ILine {
    name: 'temperature' | 'precipitation',
    referenceLineColor: string,
    lineColor: string
}
export default function Grafics() {
    const [data, setData] = useState<IData[]>([]);
    const lines: ILine[] = [{
        name: 'temperature',
        referenceLineColor: '#ffa3a3',
        lineColor: '#D22B2B'
    }, {
        name: 'precipitation',
        referenceLineColor: '#b3c2ff',
        lineColor: '#8884d8'
    }]

    useEffect((): any => {
        let mounted = true;
        if (mounted) {
            Promise.all([
                axios.get('http://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/tas/year/bra'), // temp
                axios.get('http://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/pr/year/bra')
            ]).then(result => {
                var treatedData = result[0].data.map((r: any) => {
                    const precipitation = result[1].data.find((d: any) => d.year === r.year).data;
                    return {
                        name: r.year,
                        temperature: r.data,
                        precipitation: precipitation
                    }
                });

                setData(treatedData);
            })
        }
        return () => mounted = false;
    }, [])

    const getHighestValue = (prop: 'temperature' | 'precipitation') => {
        const highest = Math.max.apply(Math, data.map((o) => { return o[prop] }));
        return data.find(d => d[prop] === highest)?.name
    }

    return (<div>
        <LineChart
            width={1150}
            height={350}
            data={data}
            margin={{
                top: 20,
                right: 50,
                left: 5,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            {lines.map(l => {
                return (
                    <React.Fragment key={l.name}>
                        <ReferenceLine x={getHighestValue(l.name)} stroke={l.referenceLineColor} label='' strokeWidth={5} />
                        <Line type='monotone' dot={false} dataKey={l.name} stroke={l.lineColor} />
                    </React.Fragment>)
            })}
        </LineChart>
    </div>)
}