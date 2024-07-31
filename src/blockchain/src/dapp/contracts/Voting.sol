// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting {
    uint public constant MAX_TIMESTAMP = 9999999999;

    struct Election {
        uint id;
        string name;
        string description;
        address admin;
        address ballotAddress;
        uint startedAt;
        uint endedAt;
        bool isStarted;
        uint createdAt;
        uint updatedAt;
    }

    struct Candidate {
        uint id;
        string name;
        address delegate;
        uint votes;
        uint createdAt;
        uint updatedAt;
    }

    struct Voter {
        uint id;
        string name;
        address delegate;
        bytes32 passwordHash;
        uint createdAt;
        uint updatedAt;
    }

    struct ElectionResults {
        Election election;
        Candidate[] candidates;
    }

    // Mappings

    uint public electionsCount;
    mapping(uint => Election) private elections;
    mapping(uint => mapping(uint => Candidate)) private electionCandidates;
    mapping(uint => uint) private electionCandidatesCount;
    mapping(uint => mapping(uint => Voter)) private electionVoters;
    mapping(uint => uint) private electionVotersCount;
    mapping(uint => mapping(address => bool)) private hasVoted;

    event Voted(
        address indexed voter,
        address indexed election,
        uint timestamp
    );

    event ElectionCreated(uint electionId);

    function getElection(
        uint _electionId
    ) public view returns (Election memory) {
        require(_electionId < electionsCount, "Election does not exist");
        return elections[_electionId];
    }

    function getAdminElections(
        address _adminAddress
    ) public view returns (Election[] memory) {
        uint count = 1;
        for (uint i = 0; i < electionsCount; i++) {
            if (elections[i].admin == _adminAddress) {
                count++;
            }
        }
        Election[] memory adminElections = new Election[](count);
        uint index = 0;
        for (uint i = 0; i < electionsCount; i++) {
            if (elections[i].admin == _adminAddress) {
                adminElections[index] = elections[i];
                index++;
            }
        }
        return adminElections;
    }

    function getElectionCandidate(
        uint _electionId,
        uint _candidateId
    ) public view returns (Candidate memory) {
        require(_electionId < electionsCount, "Election does not exist");
        require(
            _candidateId < electionCandidatesCount[_electionId],
            "Candidate does not exist"
        );
        return electionCandidates[_electionId][_candidateId];
    }

    function getElectionVoter(
        uint _electionId,
        uint _voterId
    ) public view returns (Voter memory) {
        require(_electionId < electionsCount, "Election does not exist");
        require(
            _voterId < electionVotersCount[_electionId],
            "Voter does not exist"
        );
        return electionVoters[_electionId][_voterId];
    }

    function getElectionsCount() public view returns (uint) {
        return electionsCount;
    }

    function getElectionCandidatesCount(
        uint _electionId
    ) public view returns (uint) {
        require(_electionId < electionsCount, "Election does not exist");
        return electionCandidatesCount[_electionId];
    }

    function getElectionVotersCount(
        uint _electionId
    ) public view returns (uint) {
        require(_electionId < electionsCount, "Election does not exist");
        return electionVotersCount[_electionId];
    }

    function hasVotedInElection(
        uint _electionId,
        address _voterAddress
    ) public view returns (bool) {
        require(_electionId < electionsCount, "Election does not exist");
        return hasVoted[_electionId][_voterAddress];
    }

    // Getters úteis

    function getVoterElections(
        address _voterAddress
    ) public view returns (Election[] memory) {
        Election[] memory voterElections = new Election[](electionsCount);
        uint count = 0;
        for (uint i = 0; i < electionsCount; i++) {
            for (uint j = 0; j < electionVotersCount[i]; j++) {
                if (electionVoters[i][j].delegate == _voterAddress) {
                    voterElections[count] = elections[i];
                    count++;
                    break;
                }
            }
        }
        return voterElections;
    }

    function getCandidateElections(
        address _delegate
    ) public view returns (Election[] memory) {
        Election[] memory candidateElections = new Election[](electionsCount);
        uint count = 0;
        for (uint i = 0; i < electionsCount; i++) {
            for (uint j = 0; j < electionCandidatesCount[i]; j++) {
                if (electionCandidates[i][j].delegate == _delegate) {
                    candidateElections[count] = elections[i];
                    count++;
                    break;
                }
            }
        }
        return candidateElections;
    }

    function getStartedElections() public view returns (Election[] memory) {
        Election[] memory startedElections = new Election[](electionsCount);
        uint count = 0;
        for (uint i = 0; i < electionsCount; i++) {
            if (elections[i].isStarted && !hasElectionEnded(i)) {
                startedElections[count] = elections[i];
                count++;
            }
        }
        return startedElections;
    }

    function getElectionsWithResults()
        public
        view
        returns (ElectionResults[] memory)
    {
        ElectionResults[] memory results = new ElectionResults[](
            electionsCount
        );
        uint count = 0;
        for (uint i = 0; i < electionsCount; i++) {
            if (hasElectionEnded(i)) {
                results[count].election = elections[i];
                results[count].candidates = new Candidate[](
                    electionCandidatesCount[i]
                );
                for (uint j = 0; j < electionCandidatesCount[i]; j++) {
                    results[count].candidates[j] = electionCandidates[i][j];
                }
                count++;
            }
        }
        return results;
    }

    // Modifiers

    modifier onlyAdmin(uint _electionId) {
        require(
            msg.sender == elections[_electionId].admin,
            "Only Admins can perform this action"
        );
        _;
    }

    modifier onlyCandidate(uint _electionId, uint _candidateId) {
        require(
            msg.sender ==
                electionCandidates[_electionId][_candidateId].delegate,
            "Only Candidates can perform this action"
        );
        _;
    }

    modifier onlyVoter(uint _electionId, uint _voterId) {
        require(
            msg.sender == electionVoters[_electionId][_voterId].delegate,
            "Only Voters can perform this action"
        );
        _;
    }

    constructor() {
        electionsCount = 0;
    }

    function getMaxTimestamp() public pure returns (uint) {
        return MAX_TIMESTAMP;
    }

    // Election

    function createElection(
        string memory _name,
        string memory _description
    ) public {
        elections[electionsCount] = Election(
            electionsCount,
            _name,
            _description,
            msg.sender,
            address(0),
            0, // No predefined time to start
            MAX_TIMESTAMP, // No predefined time to end
            false,
            block.timestamp,
            block.timestamp
        );
        emit ElectionCreated(electionsCount);
        electionsCount++;
    }

    function createElection(
        string memory _name,
        string memory _description,
        uint _startedAt,
        uint _endedAt
    ) public {
        elections[electionsCount] = Election(
            electionsCount,
            _name,
            _description,
            msg.sender,
            address(0),
            _startedAt,
            _endedAt,
            false,
            block.timestamp,
            block.timestamp
        );
        emit ElectionCreated(electionsCount);
        electionsCount++;
    }

    function hasElectionStarted(uint _electionId) public view returns (bool) {
        require(_electionId < electionsCount, "Election does not exist");
        return elections[_electionId].isStarted;
    }

    function hasElectionEnded(uint _electionId) public view returns (bool) {
        require(_electionId < electionsCount, "Election does not exist");
        return elections[_electionId].endedAt <= block.timestamp;
    }

    function startElection(uint _electionId) public onlyAdmin(_electionId) {
        require(_electionId < electionsCount, "Election does not exist");
        require(
            elections[_electionId].endedAt > block.timestamp,
            "Election has already finished."
        );
        require(
            !elections[_electionId].isStarted,
            "Election has already started"
        );

        elections[_electionId].startedAt = block.timestamp;
        elections[_electionId].isStarted = true;
    }

    function endElection(
        uint _electionId,
        string memory _desc
    ) public onlyAdmin(_electionId) {
        require(_electionId < electionsCount, "Election does not exist");
        require(
            elections[_electionId].endedAt == MAX_TIMESTAMP,
            "Election already closed!"
        );
        elections[_electionId].endedAt = block.timestamp;
        elections[_electionId].isStarted = false;
        elections[_electionId].description = string(
            abi.encodePacked(elections[_electionId].description, _desc)
        );
        elections[_electionId].updatedAt = block.timestamp;
    }

    function getElectionPeriod(
        uint _electionId
    ) public view returns (uint startPeriod, uint endPeriod) {
        require(_electionId < electionsCount, "Election does not exist");
        return (
            elections[_electionId].startedAt,
            elections[_electionId].endedAt
        );
    }

    function extendElectionPeriod(
        uint _electionId,
        uint time
    ) public onlyAdmin(_electionId) {
        require(_electionId < electionsCount, "Election does not exist");
        require(
            elections[_electionId].isStarted,
            "Election has not started yet"
        );
        elections[_electionId].endedAt += time;
    }

    function setElectionPeriod(
        uint _electionId,
        uint _startPeriod,
        uint _endPeriod
    ) public onlyAdmin(_electionId) {
        require(_electionId < electionsCount, "Election does not exist");
        require(
            !hasElectionStarted(_electionId),
            "Cannot change election period after it has started"
        );
        require(
            _startPeriod < _endPeriod,
            "Start period must be before end period"
        );
        elections[_electionId].startedAt = _startPeriod;
        elections[_electionId].endedAt = _endPeriod;
    }

    function endElections() public {
        for (uint i = 0; i < electionsCount; i++) {
            if (
                elections[i].isStarted &&
                block.timestamp >= elections[i].endedAt
            ) {
                elections[i].isStarted = false;
            }
        }
    }

    // Candidate

    function addCandidate(
        uint _electionId,
        string memory _name,
        address _delegate
    ) public onlyAdmin(_electionId) {
        require(_electionId < electionsCount, "Election does not exist");
        require(!hasElectionStarted(_electionId), "Voting has already started");
        uint candidateId = electionCandidatesCount[_electionId];
        electionCandidates[_electionId][candidateId] = Candidate(
            candidateId,
            _name,
            _delegate,
            0,
            block.timestamp,
            block.timestamp
        );
        electionCandidatesCount[_electionId]++;
    }

    function removeCandidateElection(
        uint _electionId,
        uint _candidateId
    ) public onlyAdmin(_electionId) {
        require(_electionId < electionsCount, "Election does not exist");
        require(!hasElectionStarted(_electionId), "Voting has already started");
        require(
            _candidateId < electionCandidatesCount[_electionId],
            "Candidate does not exist"
        );
        delete electionCandidates[_electionId][_candidateId];
        electionCandidatesCount[_electionId]--;
    }

    function updateCandidate(
        uint _electionId,
        uint _candidateId,
        string memory _name
    ) public onlyAdmin(_electionId) {
        require(_electionId < electionsCount, "Election does not exist");
        require(
            !hasElectionStarted(_electionId),
            "Cannot update candidate after voting has started"
        );
        require(
            _candidateId < electionCandidatesCount[_electionId],
            "Candidate does not exist"
        );

        electionCandidates[_electionId][_candidateId].name = _name;
        electionCandidates[_electionId][_candidateId].updatedAt = block
            .timestamp;
    }

    function withdrawFromElection(
        uint _electionId,
        uint _candidateId
    ) public onlyCandidate(_electionId, _candidateId) {
        require(_electionId < electionsCount, "Election does not exist");
        require(
            elections[_electionId].isStarted,
            "Cannot withdraw, the election has not started"
        );
        require(
            !hasElectionEnded(_electionId),
            "Cannot withdraw, the election has ended."
        );
        delete electionCandidates[_electionId][_candidateId];
        electionCandidatesCount[_electionId]--;
    }

    // Voter

    function addVoter(
        uint _electionId,
        string memory _name,
        string memory _password,
        address _delegate
    ) public onlyAdmin(_electionId) {
        require(_electionId < electionsCount, "Election does not exist");
        uint voterId = electionVotersCount[_electionId];
        electionVotersCount[_electionId]++;
        electionVoters[_electionId][voterId] = Voter(
            voterId,
            _name,
            _delegate,
            keccak256(abi.encodePacked(_password)),
            block.timestamp,
            block.timestamp
        );
    }

    function updateVoter(
        uint _electionId,
        uint _voterId,
        string memory _name,
        string memory _password
    ) public onlyAdmin(_electionId) {
        require(_electionId < electionsCount, "Election does not exist");
        require(
            _voterId < electionVotersCount[_electionId],
            "Voter does not exist"
        );
        electionVoters[_electionId][_voterId].name = _name;
        electionVoters[_electionId][_voterId].passwordHash = keccak256(
            abi.encodePacked(_password)
        );
        electionVoters[_electionId][_voterId].updatedAt = block.timestamp;
    }

    function castVote(uint _electionId, uint _candidateId) public {
        require(_electionId < electionsCount, "Election does not exist");
        require(
            hasElectionStarted(_electionId),
            "Election has not started yet"
        );
        require(!hasElectionEnded(_electionId), "Election has ended");
        require(
            _candidateId == electionCandidates[_electionId][_candidateId].id,
            "Candidate does not exist"
        );
        require(!hasVoted[_electionId][msg.sender], "Voter has already voted");

        bool voterRegistered = false;
        for (uint i = 0; i < electionVotersCount[_electionId]; i++) {
            if (electionVoters[_electionId][i].delegate == msg.sender) {
                voterRegistered = true;
                break;
            }
        }
        require(voterRegistered, "Voter is not registered for this election");

        electionCandidates[_electionId][_candidateId].votes++;
        hasVoted[_electionId][msg.sender] = true;
        emit Voted(
            msg.sender,
            elections[_electionId].ballotAddress,
            block.timestamp
        );
    }
}
