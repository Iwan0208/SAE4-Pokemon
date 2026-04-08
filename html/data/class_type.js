class Type {
    static all_types = {};

    constructor(name, effectiveness) {
        this.name = name;
        this.effectiveness = effectiveness;
    }

    static fill_types() {
        for (let type_name in type_effectiveness) {
            this.all_types[type_name] = new Type(type_name, type_effectiveness[type_name]);
        }
    }

    toString() {
        let values = {};
        
        // Regrouper les efficacités par valeur
        for (let type_name in this.effectiveness) {
            let value = this.effectiveness[type_name];

            if (!values.hasOwnProperty(value)) {
                values[value] = [type_name];
            } else {
                values[value].push(type_name);
            }
        }

        // Construire la chaîne à partir de l'objet créé
        let lines = [];

        for (let value in values) {
            let types = values[value];

            let line = `${value} = [${types.join(", ")}]`;
            lines.push(line);
        }

        return `${this.name} : ${lines.join(", ")}`;
    }
}