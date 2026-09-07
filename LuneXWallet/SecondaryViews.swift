import SwiftUI

struct MarketsView: View {
    @State private var search = ""
    var assets: [Asset] { search.isEmpty ? Asset.portfolio : Asset.portfolio.filter { $0.name.localizedCaseInsensitiveContains(search) || $0.symbol.localizedCaseInsensitiveContains(search) } }

    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack(alignment: .leading, spacing: 20) {
                Text("Markets").font(.largeTitle.weight(.bold))
                HStack {
                    Image(systemName: "magnifyingglass").foregroundStyle(.white.opacity(0.5))
                    TextField("Search assets", text: $search).foregroundStyle(.white)
                }.padding(15).glassCard(cornerRadius: 18)
                HStack {
                    Text("Top movers").font(.title3.weight(.bold)); Spacer()
                    Text("24H").font(.caption.weight(.bold)).padding(.horizontal, 10).padding(.vertical, 6).background(.white.opacity(0.12), in: Capsule())
                }
                ForEach(assets) { asset in MarketRow(asset: asset) }
                Text("Market sentiment").font(.title3.weight(.bold)).padding(.top, 4)
                VStack(alignment: .leading, spacing: 12) {
                    HStack { Text("Crypto Fear & Greed").font(.subheadline.weight(.semibold)); Spacer(); Text("74 · Greed").foregroundStyle(.mint).font(.subheadline.weight(.bold)) }
                    GeometryReader { proxy in
                        Capsule().fill(LinearGradient(colors: [.red, .orange, .yellow, .mint], startPoint: .leading, endPoint: .trailing))
                            .overlay(alignment: .leading) { Circle().fill(.white).frame(width: 16, height: 16).shadow(radius: 2).offset(x: proxy.size.width * 0.74 - 8) }
                    }.frame(height: 8)
                }.padding(18).glassCard(cornerRadius: 22)
                Spacer(minLength: 100)
            }.padding(.horizontal, 20).padding(.top, 25)
        }
    }
}

struct MarketRow: View {
    let asset: Asset
    var body: some View {
        HStack(spacing: 14) {
            Text(asset.monogram).font(.title3.weight(.bold)).frame(width: 44, height: 44).background(asset.color.gradient, in: Circle())
            VStack(alignment: .leading) { Text(asset.name).font(.subheadline.weight(.bold)); Text(asset.symbol).font(.caption).foregroundStyle(.white.opacity(0.55)) }
            Spacer()
            MiniChart(color: asset.color).frame(width: 70, height: 28)
            VStack(alignment: .trailing) { Text(asset.value).font(.subheadline.weight(.bold)); Text(asset.change).font(.caption.weight(.bold)).foregroundStyle(.mint) }
        }.padding(14).glassCard(cornerRadius: 21)
    }
}

struct MiniChart: View {
    let color: Color
    var body: some View {
        GeometryReader { proxy in
            Path { path in
                path.move(to: CGPoint(x: 0, y: proxy.size.height * 0.72))
                path.addCurve(to: CGPoint(x: proxy.size.width * 0.45, y: proxy.size.height * 0.55), control1: CGPoint(x: 15, y: 0), control2: CGPoint(x: 25, y: proxy.size.height))
                path.addCurve(to: CGPoint(x: proxy.size.width, y: proxy.size.height * 0.12), control1: CGPoint(x: 48, y: 0), control2: CGPoint(x: 58, y: proxy.size.height * 0.85))
            }.stroke(color, style: StrokeStyle(lineWidth: 2, lineCap: .round))
        }
    }
}

struct ChatView: View {
    @State private var text = ""
    @State private var messages = [
        ChatMessage(text: "Welcome to LuneX Circle ✦", isMine: false),
        ChatMessage(text: "BTC is holding the $68K support beautifully today.", isMine: false),
        ChatMessage(text: "I just set an alert at $70K. 🚀", isMine: true)
    ]
    var body: some View {
        VStack(spacing: 0) {
            HStack(spacing: 12) {
                ZStack { Circle().fill(LinearGradient(colors: [.cyan, .purple], startPoint: .top, endPoint: .bottom)); Text("L") .font(.headline.weight(.bold)) }
                    .frame(width: 42, height: 42)
                VStack(alignment: .leading, spacing: 3) { Text("LuneX Circle").font(.headline.weight(.bold)); Label("1,842 members online", systemImage: "circle.fill").font(.caption).foregroundStyle(.mint) }
                Spacer(); Image(systemName: "ellipsis").font(.title3)
            }.padding(.horizontal, 20).padding(.top, 16).padding(.bottom, 14).glassCard(cornerRadius: 0)
            ScrollView {
                LazyVStack(spacing: 14) {
                    Text("TODAY").font(.caption2.weight(.bold)).tracking(1).foregroundStyle(.white.opacity(0.4)).padding(.top, 18)
                    ForEach(messages) { message in
                        HStack { if message.isMine { Spacer() }; Text(message.text).font(.subheadline).padding(.horizontal, 15).padding(.vertical, 12).background(message.isMine ? Color.cyan.opacity(0.35) : Color.white.opacity(0.12), in: RoundedRectangle(cornerRadius: 19, style: .continuous)); if !message.isMine { Spacer() } }
                    }
                }.padding(.horizontal, 20)
            }
            HStack(spacing: 12) {
                Button {} label: { Image(systemName: "plus").font(.headline).frame(width: 40, height: 40).background(.white.opacity(0.1), in: Circle()) }.buttonStyle(.plain)
                TextField("Message Circle", text: $text, axis: .vertical).lineLimit(1...3).padding(.horizontal, 14).padding(.vertical, 10).background(.white.opacity(0.1), in: Capsule())
                Button { send() } label: { Image(systemName: "arrow.up").font(.headline.weight(.bold)).foregroundStyle(.black).frame(width: 40, height: 40).background(.white, in: Circle()) }.buttonStyle(.plain)
            }.padding(16).glassCard(cornerRadius: 0)
        }
    }
    private func send() { guard !text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return }; messages.append(ChatMessage(text: text, isMine: true)); text = "" }
}

struct ProfileView: View {
    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack(spacing: 22) {
                Text("Profile").font(.largeTitle.weight(.bold)).frame(maxWidth: .infinity, alignment: .leading)
                VStack(spacing: 10) {
                    Text("A").font(.system(size: 34, weight: .bold)).frame(width: 82, height: 82).background(LinearGradient(colors: [.cyan, .purple], startPoint: .topLeading, endPoint: .bottomTrailing), in: Circle())
                    Text("Alex Morgan").font(.title3.weight(.bold)); Text("0x4e8...91D2").font(.caption).foregroundStyle(.white.opacity(0.55))
                }.frame(maxWidth: .infinity).padding(24).glassCard()
                VStack(spacing: 0) { ProfileLine(icon: "shield.checkered", title: "Security", detail: "Face ID enabled"); Divider().overlay(.white.opacity(0.12)); ProfileLine(icon: "bell", title: "Price alerts", detail: "3 active"); Divider().overlay(.white.opacity(0.12)); ProfileLine(icon: "gearshape", title: "Settings", detail: "Preferences") }.glassCard(cornerRadius: 24)
                Text("LuneX Wallet · v1.0.0").font(.caption).foregroundStyle(.white.opacity(0.4)); Spacer(minLength: 100)
            }.padding(.horizontal, 20).padding(.top, 25)
        }
    }
}

struct ProfileLine: View {
    let icon: String; let title: String; let detail: String
    var body: some View { HStack { Image(systemName: icon).foregroundStyle(.cyan).frame(width: 28); Text(title).font(.subheadline.weight(.semibold)); Spacer(); Text(detail).font(.caption).foregroundStyle(.white.opacity(0.55)); Image(systemName: "chevron.right").font(.caption).foregroundStyle(.white.opacity(0.35)) }.padding(18) }
}

#Preview { ContentView() }
