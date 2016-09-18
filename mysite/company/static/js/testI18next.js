
i18next.init({
  lng: 'en',
  resources: {
      {
      "de-DE": {
        "translation": {
          "key1": "value of key 1 in de-DE",
          "key": {
            "with": {
              "sub": "value deeper in object in de-DE"
            }
          }
        }
      },
      "de": {
        "translation": {
          "key1": "value of key 1 in de",
          "key2": "value of key 2 in de"
        }
      },
      "en": {
        "translation": {
          "key1": "value of key 1 in en",
          "key2": "value of key 2 in en",
          "key3": "value of key 3 in en"
        }
      }
    }
  }
}, (err, t) => {
  // initialized and ready to go!
  const hw = i18next.t('key'); // hw = 'hello world'
});
