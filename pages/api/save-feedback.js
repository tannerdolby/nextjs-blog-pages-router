export default function handler(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const feedback = req.body.feedback;

    // Do something with the form submission,
    // For example save user feedback to database etc
    /* db.collection.insert({
        name: name,
        email: email,
        feedback: feedback,
    });
    */

    res.status(200).json({text: 'Saved user feedback to database'});
}