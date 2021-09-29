//? airbnb/visx libs
import { Group } from "@visx/group";
import { GradientOrangeRed } from "@visx/gradient";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Bar } from "@visx/shape";
import { extent, max } from "d3-array";
import { scaleBand, scaleLinear } from "@visx/scale";

//gql
import { useQuery, gql } from "@apollo/client";

//* gql req
const GET_POSTS = gql`
    query ($count: Int) {
        allPosts(count: $count) {
            createdAt
        }
    }
`;

const Chart = () => {
    const months = [
        {month:"jan", value: 0},
        {month:"feb", value: 0},
        {month:"mar", value: 0},
        {month:"apr", value: 0},
        {month:"may", value: 0},
        {month:"jun", value: 0},
        {month:"jul", value: 0},
        {month:"aug", value: 0},
        {month:"sep", value: 0},
        {month:"oct", value: 0},
        {month:"nov", value: 0},
        {month:"dec", value: 0},
	];

    const { loading, error, data } = useQuery(GET_POSTS, {
        variables: { count: 10000 }, //? the ctrl alt f pretty thing breaks the variable
    });

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    data.allPosts.map((res) => {
        let date = new Date(Math.floor(res.createdAt)).toDateString();
        let dateArr = date.split(" ");
        if (dateArr[3] === "2019") {
			let m = dateArr[1].toLocaleLowerCase()
            months.map(mo => {
				if(mo.month === m) mo.value += 1;
			})
            return dateArr[1].toLocaleLowerCase();
        }
    });

    console.log(months);

    const width = 1600;
    const height = 900;

    const margin = {
        top: 60,
        bottom: 60,
        left: 80,
        right: 80,
    };

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;
    //! the "not very sure" part of the code starts here

    //TODO accessor
    const x = (m) => m.month;
	const y = (m) => m.value;

    const xScale = scaleBand({
        range: [0, xMax],
        round: true,
        domain: months.map(x),
        padding: 0.4,
    });

    const yScale = scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...months.map(y))],
    });

    return (
        <svg width={width} height={height}>
            <Group top={margin.top} left={margin.left}>
                <AxisLeft
                    left={10}
                    scale={yScale}
                    numTicks={4}
                    label="Number of Posts"
                />
                {months.map((m, i) => {
                    const label = x(m);
                    const barWidth = xScale.bandwidth();
                    const barHeight = yMax - yScale(y(m));
                    const barX = xScale(label);
                    const barY = yMax - barHeight;

                    return ( 
                        <Bar
                            key={`bar-${label}`}
                            x={barX}
                            y={barY}
                            width={barWidth}
                            height={barHeight}
                        />
                    );
                })}
                <AxisBottom
                    scale={xScale}
                    label="Months"
                    labelOffset={15}
                    top={yMax}
                />
            </Group>
        </svg>
    );
};

export default Chart;

/**
<div>
	<svg width={width} height={height}>
		<GradientOrangeRed id="gradOraRed" />
		<Group top={margin.top} left={margin.left} right={margin.right}>
			{mKeys.map((m, i) => {
				return (
					<Bar
						key={`bar-${m}`}
						data={dateData}
						x={i}
						y={y(m)}
						width={width}
						height={height}
						fill="url(#gradOraRed)"
					/>
				);
			})}{" "}
		</Group>
	</svg>
</div>

 */
