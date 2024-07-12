/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4zy80prc6gzsvd")

  collection.options = {
    "query": "WITH company_users AS (\n    SELECT company.company_name, json_group_array(users.name) AS user_names\n    FROM users\n    JOIN company ON users.company_id = company.id\n    GROUP BY company.company_name\n),\nnot_logged_users AS (\n    SELECT t1.company, json_group_array(t1.name) AS not_logged_names\n    FROM notloggedfor20 AS t1\n    GROUP BY t1.company\n)\nSELECT \n    (ROW_NUMBER() OVER ()) AS id,\n    t1.company\nFROM not_logged_users AS t1\nJOIN company_users AS t2 ON t1.company = t2.company_name\nWHERE t1.not_logged_names = t2.user_names\n"
  }

  // remove
  collection.schema.removeField("hqtullhl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hz2ympyp",
    "name": "company",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4zy80prc6gzsvd")

  collection.options = {
    "query": "WITH company_users AS (\n    SELECT company.company_name, json_group_array(users.name) AS user_names\n    FROM users\n    JOIN company ON users.company_id = company.id\n    GROUP BY company.company_name\n),\nnot_logged_users AS (\n    SELECT t1.company, json_group_array(t1.name) AS not_logged_names\n    FROM notloggedfor20 AS t1\n    GROUP BY t1.company\n)\nSELECT \n    (ROW_NUMBER() OVER ()) AS id,\n    t1.company\nFROM not_logged_users AS t1\nJOIN company_users AS t2 ON t1.company = t2.company_name\nWHERE t1.not_logged_names = t2.user_names\nGROUP BY t1.company;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hqtullhl",
    "name": "company",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("hz2ympyp")

  return dao.saveCollection(collection)
})
