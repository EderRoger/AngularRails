json.array!(@pessoas) do |pessoa|
  json.extract! pessoa, :id, :nome, :email
  json.url pessoa_url(pessoa, format: :json)
end
