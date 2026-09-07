import SwiftUI

struct ContentView: View {
    @State private var selectedTab = 0

    var body: some View {
        ZStack {
            GradientBackdrop()
            TabView(selection: $selectedTab) {
                DashboardView().tag(0)
                MarketsView().tag(1)
                ChatView().tag(2)
                ProfileView().tag(3)
            }
            .tabViewStyle(.page(indexDisplayMode: .never))
            .safeAreaInset(edge: .bottom) { tabBar }
        }
    }

    private var tabBar: some View {
        HStack(spacing: 0) {
            tabItem("house.fill", "Home", 0)
            tabItem("chart.xyaxis.line", "Markets", 1)
            tabItem("bubble.left.and.bubble.right.fill", "Circle", 2)
            tabItem("person.fill", "Profile", 3)
        }
        .padding(.horizontal, 8)
        .padding(.vertical, 9)
        .glassCard(cornerRadius: 24)
        .padding(.horizontal, 20)
        .padding(.bottom, 8)
    }

    private func tabItem(_ icon: String, _ title: String, _ tag: Int) -> some View {
        Button { withAnimation(.spring(response: 0.3)) { selectedTab = tag } } label: {
            VStack(spacing: 4) {
                Image(systemName: icon).font(.system(size: 16, weight: .semibold))
                Text(title).font(.caption2.weight(.medium))
            }
            .frame(maxWidth: .infinity)
            .foregroundStyle(selectedTab == tag ? .white : .white.opacity(0.45))
        }
        .buttonStyle(.plain)
    }
}

struct DashboardView: View {
    @State private var showBalance = true
    @State private var selectedPeriod = "1W"
    let periods = ["1D", "1W", "1M", "1Y"]

    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack(spacing: 22) {
                header
                balanceCard
                actionRow
                portfolioHeader
                ForEach(Asset.portfolio) { asset in AssetRow(asset: asset) }
                Spacer(minLength: 100)
            }
            .padding(.horizontal, 20)
            .padding(.top, 14)
        }
    }

    private var header: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text("Good evening, Alex").font(.title3.weight(.semibold))
                Label("All systems operational", systemImage: "checkmark.circle.fill")
                    .font(.caption).foregroundStyle(.mint)
            }
            Spacer()
            Button {} label: {
                Image(systemName: "bell.badge.fill").font(.title3)
                    .frame(width: 44, height: 44).glassCard(cornerRadius: 16)
            }.buttonStyle(.plain)
        }
    }

    private var balanceCard: some View {
        VStack(alignment: .leading, spacing: 18) {
            HStack {
                Text("TOTAL BALANCE").font(.caption.weight(.bold)).tracking(1.2).foregroundStyle(.white.opacity(0.55))
                Spacer()
                Button { showBalance.toggle() } label: { Image(systemName: showBalance ? "eye.fill" : "eye.slash.fill") }
                    .foregroundStyle(.white.opacity(0.7))
            }
            Text(showBalance ? "$25,029.05" : "••••••••")
                .font(.system(size: 38, weight: .bold, design: .rounded))
            HStack {
                Label("+$1,436.52", systemImage: "arrow.up.right")
                    .font(.subheadline.weight(.bold)).foregroundStyle(.mint)
                Text("+6.08% this week").font(.subheadline).foregroundStyle(.white.opacity(0.58))
                Spacer()
            }
            PriceChart()
                .frame(height: 80)
            HStack {
                ForEach(periods, id: \.self) { period in
                    Button { selectedPeriod = period } label: {
                        Text(period).font(.caption.weight(.bold))
                            .foregroundStyle(selectedPeriod == period ? .black : .white.opacity(0.58))
                            .frame(maxWidth: .infinity).padding(.vertical, 7)
                            .background(selectedPeriod == period ? .white : .clear, in: Capsule())
                    }.buttonStyle(.plain)
                }
            }
        }
        .padding(22)
        .glassCard()
    }

    private var actionRow: some View {
        HStack(spacing: 12) {
            QuickAction(icon: "arrow.up", title: "Send", tint: .cyan)
            QuickAction(icon: "arrow.down", title: "Receive", tint: .purple)
            QuickAction(icon: "arrow.left.arrow.right", title: "Swap", tint: .pink)
            QuickAction(icon: "plus", title: "Buy", tint: .orange)
        }
    }

    private var portfolioHeader: some View {
        HStack {
            Text("Your assets").font(.title3.weight(.bold))
            Spacer()
            Button("See all") {}.font(.subheadline.weight(.semibold)).foregroundStyle(.cyan)
        }
    }
}

struct PriceChart: View {
    private let values: [CGFloat] = [0.76, 0.65, 0.71, 0.48, 0.58, 0.40, 0.50, 0.25, 0.38, 0.18, 0.26, 0.06]
    var body: some View {
        GeometryReader { proxy in
            let points = values.enumerated().map { i, value in
                CGPoint(x: proxy.size.width * CGFloat(i) / CGFloat(values.count - 1), y: proxy.size.height * value)
            }
            ZStack {
                Path { path in
                    path.move(to: points[0])
                    for point in points.dropFirst() { path.addLine(to: point) }
                }
                .stroke(LinearGradient(colors: [.cyan, .purple], startPoint: .leading, endPoint: .trailing), style: StrokeStyle(lineWidth: 3, lineCap: .round, lineJoin: .round))
                Circle().fill(.white).frame(width: 7).position(points.last!)
            }
        }
    }
}

struct QuickAction: View {
    let icon: String; let title: String; let tint: Color
    var body: some View {
        Button {} label: {
            VStack(spacing: 9) {
                Image(systemName: icon).font(.headline.weight(.bold)).foregroundStyle(tint)
                    .frame(width: 46, height: 46).background(tint.opacity(0.15), in: Circle())
                Text(title).font(.caption.weight(.semibold)).foregroundStyle(.white)
            }.frame(maxWidth: .infinity)
        }.buttonStyle(.plain)
    }
}

struct AssetRow: View {
    let asset: Asset
    var body: some View {
        HStack(spacing: 14) {
            Text(asset.monogram).font(.title3.weight(.bold)).foregroundStyle(.white)
                .frame(width: 46, height: 46).background(asset.color.gradient, in: Circle())
            VStack(alignment: .leading, spacing: 3) {
                Text(asset.name).font(.subheadline.weight(.bold))
                Text(asset.amount).font(.caption).foregroundStyle(.white.opacity(0.5))
            }
            Spacer()
            VStack(alignment: .trailing, spacing: 3) {
                Text(asset.value).font(.subheadline.weight(.bold))
                Text(asset.change).font(.caption.weight(.semibold)).foregroundStyle(.mint)
            }
        }
        .padding(14).glassCard(cornerRadius: 21)
    }
}
