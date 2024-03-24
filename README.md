## The Problem

The current energy market is plagued by inefficiencies, lack of transparency, and limited access to direct trading mechanisms for individual producers and small enterprises. Traditional systems often result in lost potential for renewable energy sources, as excess energy cannot be efficiently distributed and utilized. Moreover, consumers face high energy costs and limited options for sustainable energy sources. The centralization of energy distribution also poses risks of monopolistic control and inhibits the broader adoption of renewable energy solutions, ultimately hindering the transition to a more sustainable and resilient energy system.

# Solution Description

DeVolt is an innovative blockchain-based platform that revolutionizes the energy market, enabling individual producers and companies to sell their surplus energy directly to us. Using smart contracts, we ensure secure and transparent transactions. The acquired energy is then made available to consumers through our charging stations for electric vehicles and electric bicycles, expanding the sustainable mobility infrastructure.

With the success of this initiative, we plan to extend our reach by also providing energy to industries and homes, creating a comprehensive and integrated energy ecosystem. This future plan aims to optimize energy consumption, reducing costs and promoting sustainability.

The use of blockchain is central to DeVolt, as it provides a solid foundation of trust and efficiency. The technology allows tracking each energy transaction, ensuring integrity and transparency. This not only strengthens security against fraud but also promotes greater market adoption as users recognize the system's reliability. The inherent decentralization of blockchain facilitates a more democratic and accessible market, where producers and consumers have direct and equalized control over energy transactions, marking a significant advancement in the way energy is traded and consumed globally.

![Mock](assets/mock1.png)

# How is the DeVolt built?

**⁠Scroll:** Chosen for its simple integration with Layer 1 Ethereum, zero-knowledge proof alignment, and compatibility with EVM technologies.

**Chainlink PriceFeed:** Integrates off-chain data into the network, verifying and auditing the data through various nodes—used in our case to create a stable coin.

**Scaffold ETH2 (Next.js, DaisyUI, and ShadCN):** Create a user-friendly interface on a platform that allows electric vehicle users to charge their vehicles and energy producers to market their production or surplus.

⁠**Cartesi:** Used for its optimistic rollups, ensuring true and verified computation, which also allows the use of technologies beyond Solidity, enabling work with any stack.

**⁠Foundry:** Deploys our contracts to the Scroll network, utilizing Cartesi's standard contracts for DApp interaction and our platform's token contracts.

**Golang, Kafka, HiveMQ, and MongoDB:** Represent our charging units, sending data to the blockchain every second to depict their status, charge level, usage, etc.

## Future Implementations

Looking ahead, DeVolt aims to expand its blockchain platform to integrate advanced technologies like AI and IoT, enhancing energy management and distribution efficiency. We plan to develop predictive analytics tools to forecast energy production and demand accurately, enabling more effective balancing of the energy grid. Additionally, we will explore the integration of renewable energy sources, such as solar and wind, to further diversify the energy portfolio and reduce reliance on non-renewable sources.

Another key area of focus will be the expansion of our electric vehicle (EV) charging network, facilitating broader access to clean transportation options. By increasing the number of smart charging stations, we can ensure that the infrastructure keeps pace with the growing demand for EVs, supporting a greener transportation ecosystem.

Furthermore, DeVolt is committed to fostering community-based energy projects, empowering local communities to produce, manage, and consume their own energy, thus promoting energy independence and sustainability. These future implementations will not only enhance DeVolt’s service offerings but also contribute significantly to the global shift towards a more sustainable and efficient energy landscape.

### Criadores

- [Matheus Macedo Santos](https://www.linkedin.com/in/matheusmacedosantos/)
- [Marcelo Gomes Feitoza](https://www.linkedin.com/in/marcelofeitoza7/)
- [Paulo Evangelista](https://www.linkedin.com/in/paulo-evangelista/)
- [Emanuele Morais](https://www.linkedin.com/in/emanuele-morais/)
- [Henrique Marlon](https://www.linkedin.com/in/henriquemarlon/)
