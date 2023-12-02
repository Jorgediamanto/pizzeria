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
    mensaje_mostrado = False  # Variable para asegurar que el mensaje de recomendación se muestre solo una vez
    with open('pizzzeria.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Utiliza row['column1'] para obtener el número guardado en el CSV
            # Implementa la lógica para construir la pizza según el número

            # Ejemplo: Construir pizza con PizzaBuilder
            pizza_builder = PizzaBuilder(size='medium')
            if row['column1'] == user_input:
                pizza_builder.set_cheese('mozzarella').set_pepperoni(True).set_bacon(True)
                
                # Muestra el mensaje de recomendación específico si el valor es 2
                if user_input == '2' and not mensaje_mostrado:
                    print("Recomendación: La salsa 2 es muy recomendada al hacer una buena combinación.")
                    mensaje_mostrado = True
                else:
                    print(f'Recomendación: {str(pizza_builder.build())}')
                
                # No es necesario enviar la recomendación al servidor Express en este ejemplo
            else:
                # Implementa lógica para otras opciones
                pass

if __name__ == "__main__":
    import sys

    if len(sys.argv) != 2:
        print("Por favor, proporciona el número como argumento.")
        sys.exit(1)

    user_input = sys.argv[1]
    build_pizza(user_input)
