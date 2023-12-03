# tu_script_python.py
import csv
import subprocess
import json

class Pizza:
    def __init__(self, builder):
        self.size = builder.size
        self.cheese = builder.cheese
        self.pepperoni = builder.pepperoni
        self.bacon = builder.bacon

    def __str__(self):
        return f'Pizza: {self.size} {self.cheese} {self.pepperoni} {self.bacon}'

class PizzaBuilder:
    def __init__(self, size):
        self.size = size
        self.cheese = None
        self.pepperoni = None
        self.bacon = None

    def set_cheese(self, cheese):
        self.cheese = cheese
        return self
        
    def set_pepperoni(self, pepperoni):
        self.pepperoni = pepperoni
        return self
    
    def set_bacon(self, bacon): 
        self.bacon = bacon
        return self

    def build(self):
        return Pizza(self)

def build_pizza(user_input):
    # Lee el CSV y realiza la lógica para construir la pizza
    with open('pizzzeria.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Utiliza row['column1'] para obtener el número guardado en el CSV
            # Implementa la lógica para construir la pizza según el número

            # Ejemplo: Construir pizza con PizzaBuilder
            pizza_builder = PizzaBuilder(size='medium')
            if row['column1'] == user_input:
                pizza_builder.set_cheese('mozzarella').set_pepperoni(True).set_bacon(True)
            else:
                # Implementa lógica para otras opciones
                pass

            pizza = pizza_builder.build()

            # Imprime la recomendación
            recommendation_message = f'Recomendación: {str(pizza)}'

            # Envia la recomendación al servidor Express
            subprocess.run(['curl', '-X', 'POST', 'http://localhost:5501/sendRecommendation', '-H', 'Content-Type: application/json', '-d', json.dumps({'message': recommendation_message})])

if __name__ == "__main__":
    import sys

    if len(sys.argv) != 2:
        print("Por favor, proporciona el número como argumento.")
        sys.exit(1)

    user_input = sys.argv[1]
    build_pizza(user_input)
