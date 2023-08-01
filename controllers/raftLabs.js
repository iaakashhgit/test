const raftLabs = async (req, res) => {
    const output = "Hello, World!"

    console.log(output) // we can console it also
    return res.send(output)
}

module.exports = { raftLabs }