# Moment show

An audiovisual presentation of _moments_ - combinations of map point, image and audio.

Project is built using React and bootstrapped with `create-react-app`. For more info see create-react-app [README](README-create-react-app.md) file.

The JSON REST backend is built on [Contentful](https://www.contentful.com/). Below is a JSON presentation of the model:

````
{
  "name": "Moment",
  "description": "Moment consists of a place, picture and sound.",
  "displayField": "name",
  "fields": [
    {
      "name": "Name",
      "id": "name",
      "type": "Symbol",
      "localized": false,
      "required": false,
      "disabled": false,
      "omitted": false,
      "validations": []
    },
    {
      "name": "Order",
      "id": "order",
      "type": "Integer",
      "validations": []
    },
    {
      "name": "Images",
      "id": "images",
      "type": "Array",
      "items": {
        "type": "Link",
        "linkType": "Asset",
        "validations": []
      },
      "validations": [],
      "localized": false,
      "required": false,
      "disabled": false,
      "omitted": false
    },
    {
      "name": "Sounds",
      "id": "sounds",
      "type": "Array",
      "items": {
        "type": "Link",
        "linkType": "Asset"
      },
      "localized": false,
      "required": false,
      "disabled": false,
      "omitted": false,
      "validations": []
    },
    {
      "name": "Location",
      "id": "location",
      "type": "Location",
      "localized": false,
      "required": false,
      "disabled": false,
      "omitted": false,
      "validations": []
    }
  ],
  "sys": {
    "id": "moment",
    "type": "ContentType",
    "createdAt": "2017-04-27T12:01:55.042Z",
    "createdBy": {
      "sys": {
        "type": "Link",
        "linkType": "User",
        "id": "5MjSAm2iX8rzXzagsM7302"
      }
    },
    "space": {
      "sys": {
        "type": "Link",
        "linkType": "Space",
        "id": "oz8k3o360ryy"
      }
    },
    "firstPublishedAt": "2017-04-27T12:01:55.548Z",
    "publishedCounter": 2,
    "publishedAt": "2017-05-10T04:13:18.885Z",
    "publishedBy": {
      "sys": {
        "type": "Link",
        "linkType": "User",
        "id": "5MjSAm2iX8rzXzagsM7302"
      }
    },
    "publishedVersion": 3,
    "version": 4,
    "updatedAt": "2017-05-10T04:13:18.914Z",
    "updatedBy": {
      "sys": {
        "type": "Link",
        "linkType": "User",
        "id": "5MjSAm2iX8rzXzagsM7302"
      }
    }
  }
}
```