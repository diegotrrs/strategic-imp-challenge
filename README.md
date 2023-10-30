# 1. Solution description

## 1.1 Mapping configuration structure

The mappings configuration is defined as a JSON object. An example of this can be found in `src/tests/mappings-data-example.ts`.

Each supplier can have two mappings (supplierToGateaway and gateawayToSupplier) in each one you simply define the mapping relations as ``source`` and ``target``. For example, the following structure defines a mapping defined for name and value between LINE_PROFILE and PROFILE.

```
{
    source: {
      name: "LINE_PROFILE",
      value: "1",
    },
    target: {
      name: "PROFILE",
      value: "1AB",
    },
},
```
1 to many gateway characteristics to supplier characteristics are defined as consecutive entries with the same **source**:

```
gateawayToSupplier: [
  {
    source: {
      name: "LINE_PROFILE",
      value: "1",
    },
    target: {
      name: "UPSTREAM",
      value: "12",
    },
  },
  {
    source: {
      name: "LINE_PROFILE",
      value: "1",
    },
    target: {
      name: "DOWNSTREAM",
      value: "1000",
    },
  },
  ],
```

Similarly, many supplier characteristics to 1 gateway characteristics are defined as several entries with the same **target**:

```
supplierToGateaway: [
    {
      source: {
        name: "UPSTREAM",
        value: "12",
      },
      target: {
        name: "LINE_PROFILE",
        value: "1",
      },
    },
    {
      source: {
        name: "DOWNSTREAM",
        value: "1000",
      },
      target: {
        name: "LINE_PROFILE",
        value: "1",
      },
    },
],
```

The implementation for the mapping functions in both ways can be found in `src/characteristics-mapper.ts` 

## 1.2 Example
If we needed to map the characteristic TalkTalk's ID (``TALK_TALK_ID``) to the general Gateway's ID (``IDENTIFIER``) the following mapping would take of the transformation:


```
 {
    _id: "TalkTalk",
    mappings: {
      supplierToGateaway: [
        {
          source: {
            name: "TALK_TALK_ID",
          },
          target: {
            name: "IDENTIFIER",            
          },
        },        
      ],   
    },
  },
```

## 1.3 Architecture
- The mapping configurations are stored in a MongoDB hosted in the cloud.

- There is a in-memory cache that gets populated with all mappings from the DB when the app starts. The cache's implementation can be found in `src/cache.ts`

- The in-memory cache is kept up to date by using [MongoDB's Change streams](https://www.mongodb.com/docs/manual/changeStreams/). Everytime a new mapping is inserted in the DB the cache is updated. Check out the code for this in `src/mongo-db-client.ts` 

- The mapping functions in `src/characteristics-mapper` access the mappings from the in-memory cache, not from the DB.

- A simple Rest API is provided just to test retrieving and creating new mappings. This Rest API does not make use of the code in the mapping functions in `characteristics-mapper`, it just provides a way to create a new mapping and to retrieve all mappings.

> The approach and the code is not intended to be production-ready, it was kept as simple as possible for the purpose of this coding challenge. 

The following diagram shows the solution's general architecture
 ![Solution](/solution-diagram.png)


# 2. Setup

## 2.1 Installation
From the root folder run:

```bash
npm install
```

## 2.2 Env file

> The following step is only required if you want to test the Mappings Api, it's not required to run the tests.

Rename the .env.example file to .env and replace its contents with the values in the link provided separately.

## 2.3 IP Address

> The following step is only required if you want to test the Mappings Api, it's not required to run the tests.

The DB is hosted in cloud.mongodb.com and your IP address needs to be added to the list of allowed IP Address. Please send me an email at diego.torres.arguedas@gmail.com with your IP Address.
 
> In order to avoid this step, I tried to deploy the app to a Cloud Provider (specifically Digital Ocean) but I couldn't finish it because of time. 

# 3. How to run

## 3.1 Tests

From the root folder run:
```bash
npm run test
```

Notice that the tests do not depend on the data in the DB or even the cache. Instead a testing stub is created to for the cache to contain the data in `src/tests/mappings-data-example`. The following code achieves this:

```
// For the tests create a stub for getMappingsFromCache so the test mappings data is returned
const getMappingsWrapperStub = sinon.stub(cacheModule, 'getMappingsFromCache');
getMappingsWrapperStub.returns(testMappings);

```

## 3.2 Locally
Start the app by running:
```
npm run dev
```

> Remember to have shared your IP address.

You can retrieve all mappings by running the following command.
```bash
curl --location 'http://localhost:3000/mappings'
```

You can insert a new mapping by running the following command (replace 'TalkTalk' with the supplierId and the mappings with the payload)

```bash
curl --location 'http://localhost:3000/TalkTalk/mappings' \
--header 'Content-Type: application/json' \
--data '{
   "mappings":{
      "supplierToGateaway":[
         {
          "source": {
            "name": "TALK_TALK_CLIENT_ID"
          },
          "target": {
            "name": "SUPPLIER_CLIENT_ID"
          }
        }
      ]
   }
}
'
```

# 4. Improvements.
As mentioned, I tried to keep things as simple as possible just for the purpose of the
coding challenge. Some of the changes that I would consider for a productive release would be:
- Using a robust cache such as [Redis](https://redis.com/).
- Validate the payload in the endpoints by using a schema validation library such as [Zod](https://github.com/colinhacks/zod)
- Define the API routes in a separate file.