import { 
  View,
  Text,
  Dimensions
} from "react-native";
import {
  LineChart,

} from "react-native-chart-kit";


const ActivityChart = () => {
  const data = {
    labels: ["Jul", "Aug","Sept", "Oct", "Nov", "Dec",],
    datasets: [
      {
        data: [
          0,
          0,
          0,
          0,
          0,
          0,
        ],
        strokeWidth: 2 
      }
    ],
    legend: ["Activity Chart"] 
  };

  const chartConfig = {
    backgroundColor: "#191919",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    decimalPlaces: 0,
    propsForBackgroundLines: {
      strokeWidth: 0
    },
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "gray"
    }
  };
  return (
    <View>
      <LineChart
        data={data}
        width={Dimensions.get("window").width - 40}
        height={220}
        chartConfig={chartConfig}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          fontFamily: 'sans-serif',
        }}
      />
    </View>
  )
}

export default ActivityChart