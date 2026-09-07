import SwiftUI

struct Asset: Identifiable, Hashable {
    let id = UUID()
    let symbol: String
    let name: String
    let amount: String
    let value: String
    let change: String
    let color: Color
    let monogram: String
}

extension Asset {
    static let portfolio = [
        Asset(symbol: "BTC", name: "Bitcoin", amount: "0.184 BTC", value: "$12,438.20", change: "+2.84%", color: .orange, monogram: "₿"),
        Asset(symbol: "ETH", name: "Ethereum", amount: "2.46 ETH", value: "$8,967.74", change: "+4.12%", color: .indigo, monogram: "◆"),
        Asset(symbol: "SOL", name: "Solana", amount: "24.9 SOL", value: "$3,623.11", change: "+6.79%", color: .purple, monogram: "≋")
    ]
}

struct ChatMessage: Identifiable {
    let id = UUID()
    let text: String
    let isMine: Bool
}
