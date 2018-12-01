module.exports = {
    path: '/{p*}',
    method: 'POST',
    handler: async () => {
        return 'success';
    }
};
