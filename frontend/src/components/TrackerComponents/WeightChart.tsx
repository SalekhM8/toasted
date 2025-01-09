// src/components/TrackerComponents/WeightChart.tsx
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { WeightEntry } from '../../types/tracker.types';

interface WeightChartProps {
  data: WeightEntry[];
  xAxisLabelFormatter?: (date: string) => string;
  xAxisLabelStyle?: {
    fontSize?: number;
    angle?: number;
    marginTop?: number;
  };
}

const WeightChart: React.FC<WeightChartProps> = ({ 
  data,
  xAxisLabelFormatter = (date) => new Date(date).toLocaleDateString(),
  xAxisLabelStyle = {}
}) => {
  if (data.length === 0) return null;

  const chartData = {
    labels: data.map(entry => xAxisLabelFormatter(entry.date)),
    datasets: [{
      data: data.map(entry => entry.weight)
    }]
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForLabels: {
            ...xAxisLabelStyle
          }
        }}
        style={styles.chart}
        bezier
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  }
});

export default WeightChart;