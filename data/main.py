import csv

# Define a set to store unique id_voto values
unique_id_votos = set()

# Define dictionaries to store the normalized data
votes_data = []
candidates_data = []

with open("./votaciones.csv", 'r') as file:
    csvreader = csv.DictReader(file)
    for row in csvreader:
        id_voto = row['id_voto']
        id_candidato = row['id_candidato']
        dpi_ciudadano = row['dpi_ciudadano']
        mesa_id = row['mesa_id']
        fecha_hora = row['fecha_hora']

        # Check if id_voto is unique and add to votes_data
        if id_voto not in unique_id_votos:
            unique_id_votos.add(id_voto)
            votes_data.append({
                'id': id_voto,
                'dpi': dpi_ciudadano,
                'mesa_id': mesa_id,
                'datetime': fecha_hora
            })

        # Normalize candidates data
        candidates_data.append({
            'id_voto': id_voto,
            'id_candidato': id_candidato
        })

# Write the normalized data to separate CSV files
with open("./voto.csv", 'w', newline='') as votes_file:
    fieldnames_votes = ['id', 'dpi', 'mesa_id', 'datetime']
    csvwriter_votes = csv.DictWriter(votes_file, fieldnames=fieldnames_votes)
    csvwriter_votes.writeheader()
    csvwriter_votes.writerows(votes_data)

with open("./detalle_voto.csv", 'w', newline='') as candidates_file:
    fieldnames_candidates = ['id_voto', 'id_candidato']
    csvwriter_candidates = csv.DictWriter(candidates_file, fieldnames=fieldnames_candidates)
    csvwriter_candidates.writeheader()
    csvwriter_candidates.writerows(candidates_data)


# import csv

# # Define a set to store unique id_voto values
# unique_id_cargo = set()

# # Define dictionaries to store the normalized data
# candidate_data = []
# cargo_data = []

# with open("./candidatos.csv", 'r') as file:
#     csvreader = csv.DictReader(file)
#     for row in csvreader:
#         id = row['id']
#         nombres = row['nombres']
#         fecha_nacimiento = row['fecha_nacimiento']
#         partido_id = row['partido_id']
#         cargo_id = row['cargo_id']

#         # Check if id_voto is unique and add to votes_data
#         if cargo_id not in unique_id_cargo:
#             unique_id_cargo.add(cargo_id)
#             cargo_data.append({
#                 'id': cargo_id,
#                 'nombre': nombres
#             })
        
#         # Normalize candidates data
#         candidate_data.append({
#             'id': id,
#             'nombres': nombres,
#             'fecha_nacimiento': fecha_nacimiento,
#             'partido_id': partido_id,
#             'cargo_id': cargo_id
#         })

# # Write the normalized data to separate CSV files
# with open("./cadidato.csv", 'w', newline='') as votes_file:
#     fieldnames_votes = ['id', 'nombres', 'fecha_nacimiento', 'partido_id', 'cargo_id']
#     csvwriter_votes = csv.DictWriter(votes_file, fieldnames=fieldnames_votes)
#     csvwriter_votes.writeheader()
#     csvwriter_votes.writerows(candidate_data)

# with open("./detalle_candidato.csv", 'w', newline='') as candidates_file:
#     fieldnames_candidates = ['id', 'nombre']
#     csvwriter_candidates = csv.DictWriter(candidates_file, fieldnames=fieldnames_candidates)
#     csvwriter_candidates.writeheader()
#     csvwriter_candidates.writerows(cargo_data)


