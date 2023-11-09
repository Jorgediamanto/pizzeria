import pandas as pd
import matplotlib.pyplot as plt

# Interfaz Abstract Factory
class AnalysisFactory:
    def create_statistics(self, data):
        pass

    def create_visualization(self, data):
        pass

# Fábrica Concreta para Análisis Estadísticos
class StatisticsFactory(AnalysisFactory):
    def create_statistics(self, data):
        return Statistics(data)

    def create_visualization(self, data):
        return None

# Fábrica Concreta para Visualizaciones Gráficas
class VisualizationFactory(AnalysisFactory):
    def create_statistics(self, data):
        return None

    def create_visualization(self, data):
        return Visualization(data)

# Productos Abstractos
class Statistics:
    def __init__(self, data):
        self.data = data

    def calculate_mean(self):
        return self.data['Num Activaciones'].mean()

    def calculate_histogram(self):
        return self.data['Num Activaciones'].plot.hist(title='Histograma de Activaciones')

class Visualization:
    def __init__(self, data):
        self.data = data

    def create_bar_chart(self):
        monthly_counts = self.data.groupby(self.data['Fecha'].dt.month).size()
        return monthly_counts.plot(kind='bar', title='Activaciones por Mes')

# Leer CSV desde la URL
URL = "https://datos.madrid.es/egob/catalogo/212504-0-emergencias-activaciones.csv"
data = pd.read_csv(URL, sep=';', encoding='ISO-8859-1')
data['Fecha'] = pd.to_datetime(data['Fecha'])

# Crea una fábrica de estadísticas
statistics_factory = StatisticsFactory()
statistics_analysis = statistics_factory.create_statistics(data)
mean = statistics_analysis.calculate_mean()
histogram = statistics_analysis.calculate_histogram()

# Crea una fábrica de visualizaciones
visualization_factory = VisualizationFactory()
visualization = visualization_factory.create_visualization(data)
bar_chart = visualization.create_bar_chart()

# Muestra la media de activaciones por día
print(f"Media de activaciones por día: {mean}")

# Muestra el histograma de activaciones
plt.show()
